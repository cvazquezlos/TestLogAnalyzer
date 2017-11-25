# Pull base image.
FROM airdock/oracle-jdk:1.8

# installed version
ENV ELASTICSEARCH_VERSION 2.4.2

# Add configuration file
ADD config/*.yml /tmp/

# add gpg key for elasticsearch
# install elasticsearch and obz/elasticsearch-head plugin
RUN apt-get update -qq && apt-get install -y --no-install-recommends ca-certificates && \
  curl https://packages.elasticsearch.org/GPG-KEY-elasticsearch | apt-key add - && \
  echo 'deb http://packages.elasticsearch.org/elasticsearch/2.x/debian stable main' > /etc/apt/sources.list.d/elasticsearch.list && \
	apt-get update -qq && apt-get install -y elasticsearch=$ELASTICSEARCH_VERSION && \
	rm /etc/elasticsearch/*.yml && \
	mv /tmp/*.yml /etc/elasticsearch && \
  /usr/share/elasticsearch/bin/plugin install mobz/elasticsearch-head && \
  chown -R elasticsearch:elasticsearch  /var/lib/elasticsearch /usr/share/elasticsearch/plugins && \
  /root/post-install

# /usr/share/elasticsearch/bin/plugin -install mobz/elasticsearch-head && \
# Mountable data directories.
VOLUME ["/var/lib/elasticsearch", "/var/log/elasticsearch"]

# Expose HTTP and transport port
EXPOSE 9200 9300

# Define default command.
CMD ["tini", "-g", "--", "gosu", "elasticsearch:elasticsearch", "/usr/share/elasticsearch/bin/elasticsearch", "-Des.path.conf=/etc/elasticsearch"]
