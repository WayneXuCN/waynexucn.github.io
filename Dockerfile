FROM ruby:latest

LABEL authors="Wenjie Xu" \
    description="Docker image for my academic jekyll template" \
    maintainer="Wenjie Xu"

ENV DEBIAN_FRONTEND noninteractive

# install system dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    imagemagick \
    inotify-tools \
    locales \
    nodejs \
    procps \
    python3-pip \
    zlib1g-dev && \
    pip --no-cache-dir install --upgrade --break-system-packages nbconvert && \
    # clean up
    apt-get clean && \ 
    apt-get autoremove && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/* /tmp/*

# set the locale
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

# set environment variables
ENV EXECJS_RUNTIME=Node \
    JEKYLL_ENV=production \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

# create a directory for the jekyll site
RUN mkdir /srv/jekyll

# set the working directory
WORKDIR /srv/jekyll

# 复制 Gemfile 和 Gemfile.lock
COPY Gemfile Gemfile.lock /srv/jekyll/

# install jekyll and dependencies
RUN gem install bundler -v "$(grep -A1 'BUNDLED WITH' Gemfile.lock | tail -n1)" --no-document && \
    bundle install --no-cache

EXPOSE 8080

COPY bin/entry_point.sh /tmp/entry_point.sh

# Set the entrypoint
CMD ["sh", "-c", "cd /srv/jekyll && /tmp/entry_point.sh"]