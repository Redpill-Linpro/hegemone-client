# hegemone-client
Repository for the client application that collects and dispatches plant data to the hegemone server.

Application that displays data in the browser.

Requires podman and hegemone-server

1. Build image

    ```
    podman build -f Dockerfile -t node/hegemone-client .
    ```

2. Create a pod

    ```
    podman pod create -n hegemone -p 8080:8080 -p 5432:5432 -p 3000:3000
    ```

3. Start postgres container

    ```
    podman run -d --oom-score-adj=200 --pod hegemone --name hegemone-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=planty -e POSTGRES_DB=hegemone postgres:14.2
    ```

4. Start hegemone-server container

    ```
    podman run -d -i --rm --pod hegemone quarkus/hegemone-server
    ```

5. Start hegemone-server container

    ```
    podman run -d -i --rm --pod hegemone node/hegemone-client
    ```

6. Check health

    ```
    curl localhost:8080/device-measurements/health
    ```

7. Check graphs

Open a browser and go to 
    ```
    http://localhost:3000/
    ```
