#!/usr/bin/env ruby
# frozen_string_literal: true

# LabPage i18n strings audit
#
# Verifies that every locale's _data/<locale>/strings.yml covers the full key
# tree of the default locale. Missing keys are blocking (exit 1); extra keys
# are non-blocking warnings.
#
# Usage:
#   ruby scripts/audit-strings.rb [--default-lang LANG] [--no-fail]
#
# Exit codes: 0 = ok (or --no-fail), 1 = blocking findings, 2 = script error.

require "yaml"
require "optparse"

options = { no_fail: false }
OptionParser.new do |o|
  o.on("--default-lang LANG", "Reference locale directory (default: _config.yml default_lang)") { |v| options[:default_lang] = v }
  o.on("--no-fail", "Report blocking findings but exit 0") { options[:no_fail] = true }
end.parse!

ROOT_DIR = File.expand_path("..", __dir__)
DATA_DIR = File.join(ROOT_DIR, "_data")
CONFIG_PATH = File.join(ROOT_DIR, "_config.yml")

site_config = YAML.safe_load(File.read(CONFIG_PATH), permitted_classes: [], aliases: false) || {}
configured_languages = site_config["languages"]
configured_languages = [configured_languages] if configured_languages.is_a?(String)
default_lang = options[:default_lang] || site_config["default_lang"] || configured_languages&.first || "en_US"
configured_languages ||= [default_lang]

def load_strings(lang)
  path = File.join(DATA_DIR, lang, "strings.yml")
  return nil unless File.file?(path)

  YAML.safe_load(File.read(path), permitted_classes: [], aliases: false) || {}
end

def leaf_keys(hash, prefix = nil)
  keys = []
  hash.each do |key, value|
    path = prefix ? "#{prefix}.#{key}" : key.to_s
    if value.is_a?(Hash)
      keys.concat(leaf_keys(value, path))
    else
      keys << path
    end
  end
  keys
end

defaults = load_strings(default_lang)
if defaults.nil?
  warn "ERROR: default locale data not found: _data/#{default_lang}/strings.yml"
  exit 2
end

default_keys = leaf_keys(defaults)
locales = (configured_languages - [default_lang]).sort

blocking = []
warnings = []

locales.each do |lang|
  strings = load_strings(lang)
  if strings.nil?
    blocking << "#{lang}: strings.yml missing"
    next
  end

  lang_keys = leaf_keys(strings)
  (default_keys - lang_keys).each { |k| blocking << "#{lang}: missing key strings.#{k}" }
  (lang_keys - default_keys).each { |k| warnings << "#{lang}: extra key strings.#{k}" }
end

puts "== LabPage i18n strings audit =="
puts "locales: #{([default_lang] + locales).join(', ')}"
puts "default (#{default_lang}) keys: #{default_keys.size}"
puts "blocking: #{blocking.size} | warnings: #{warnings.size}"
blocking.each { |b| puts "  BLOCKING: #{b}" }
warnings.each { |w| puts "  warning: #{w}" }

exit(blocking.empty? || options[:no_fail] ? 0 : 1)
