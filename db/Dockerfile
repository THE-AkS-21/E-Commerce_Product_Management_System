# Use official PostgreSQL Alpine image
FROM postgres:16-alpine

# Add any custom configuration files
COPY ./postgresql.conf /etc/postgresql/postgresql.conf
COPY ./pg_hba.conf /etc/postgresql/pg_hba.conf

# Create directory for initialization scripts
RUN mkdir -p /docker-entrypoint-initdb.d

# Copy initialization scripts (if any)
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Set default configuration file
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]