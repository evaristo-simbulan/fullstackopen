```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Save status
    deactivate server
     Note right of browser: The server starts appending the new note to the list and updates the list

```