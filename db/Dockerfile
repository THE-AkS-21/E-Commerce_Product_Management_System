# Use official PostgreSQL Alpine image
FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=QWERTY

# Create directory for initialization scripts
RUN mkdir -p /docker-entrypoint-initdb.d

# Copy initialization scripts (if any)
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Set default configuration file
CMD ["postgres"]