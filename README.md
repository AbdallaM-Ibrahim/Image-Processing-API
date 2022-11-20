# Image-Processing-API
## Core libraries 
- node-js
- express
- jasmine

## What the API do?
- serve server-side images
- can get resized image
- server cacheing <sub> _for faster response time_ </sub>
- unit teesting

## Endpoint
```ts
GET `/images?file=${filename}[&width=${width}&height=${height}]`
```
