# syntax=docker/dockerfile:1
ARG VARNISH_VERSION=8.0
FROM varnish:${VARNISH_VERSION}

LABEL maintainer="Victor Fernandez de Alba <sneridagh@gmail.com>" \
      org.label-schema.name="aurora-training-project-varnish" \
      org.label-schema.description="Aurora Training Project Varnish image." \
      org.label-schema.vendor="Victor Fernandez de Alba"

COPY etc/varnish.vcl /etc/varnish/default.vcl
