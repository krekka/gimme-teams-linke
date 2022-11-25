FROM lukechannings/deno

# Setting up our application
WORKDIR /app
USER deno
COPY . .

# Running application
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "index.ts"]