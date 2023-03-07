# Select an image capable of building the .apk
FROM python:3.7-alpine
WORKDIR /mobile_code
RUN apk add --no-cache gcc musl-dev linux-headers libffi-dev

# Place .apk file in "/build" directory

# expose port to 8081
EXPOSE 8081

COPY . .
# Run a python server on exposed port
WORKDIR /mobile_code/build
CMD ["python", "-m", "http.server", "8081"]
