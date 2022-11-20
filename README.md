# Image-Processing-API
## Core libraries 
- node-js
- typescript
- express
- jasmine
- [sharp](https://www.npmjs.com/package/sharp)

## What the API do?
- serve server-side images
- can get resized image
- server cacheing <sub> _for faster response time_ </sub>
- unit teesting

## Endpoint
```ts
GET `/images?file=${filename}[&width=${width}&height=${height}]`
```
