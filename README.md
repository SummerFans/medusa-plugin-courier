<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
    <a href="https://www.courier.com">
    <picture>
      <img alt="Medusa logo" width="55" src="https://www.courier.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2Fz7iqk1q8njt4%2F2d8018KcJbixqrzcoxUBWH%2F0f125c6776574f684ab71031c458a76a%2FCourier_circle.png&w=828&q=100">
      </picture>
  </a>
</p>
<h1 align="center">
  Medusa Plugin Courier Notification
</h1>

<p align="center">
  Medusa notification plugin template provided
</p>

## ENV
```
AUTH_TOKEN={AUTH_TOKEN}
```

medusa-config.js
```
{
    resolve: "medusa-plugin-courier",
    options: {
        auth_token: "xxxxx",
        store_url: process.env.FONT_URL || "http://localhost:8000",
        template: {
            "order.created": {
                "en-US": "xxxxx",
                "zh-CN": "xxxxx",
                "de-DE": "xxxxx"
            }
        }
}
```
OR
```
{
    resolve: "medusa-plugin-courier",
    options: {
        auth_token: "xxxxx",
        store_url: process.env.FONT_URL || "http://localhost:8000",
        template: {
            "order.created": "xxx"
        }
}
```

## Event List
