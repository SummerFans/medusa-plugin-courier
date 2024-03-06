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
  Medusa Plugin <a target="_blank" href="https://www.courier.com">Courier</a> Notification
</h1>

<p align="center">
  Medusa notification plugin template provided
</p>
<p>
The Courier plugin is a simple notification plugin that currently only supports email notifications. 
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
      store_name: "xxx",
      auth_token: "xxxxx",
      store_url: process.env.STOREFRONT_URL || "http://localhost:8000",
      template: {
          "order.placed": "{COURIER_TEMPLATE_ID}"
      }
    }
}
```

> COURIER_TEMPLATE_ID: [How to Design a Courier Notification](https://www.courier.com/docs/platform/content/notification-designer/design-a-notification/)
>  If the {COURIER_TEMPLATE_ID} does not exist, the default template will be used.



## Progress
### Order Event
- [x] [order.placed](#ORDER.PLACED)
- [ ] [order.shipment.created](#ORDER.SHIPMENT_CREATED)
- [ ] [order.canceled](#ORDER.CANCELED)
- [ ] [order.completed](#ORDER.COMPLETED)
- [ ] [order.refund_created](#ORDER.REFUND_CREATED)
- [ ] [order.refund_failed](#ORDER.REFUND_FAILED)

### Customer Event
- [x] [customer.created](#CUSTOMER.CREATED)
- [ ] [customer.passwored_reset](#CUSTOMER.PASSWORED_RESET)

## Template variables
### ORDER.PLACED
| name                 | type   | des          |
| -------------------- | ------ | ------------ |
| id                   | string | unique id    |
| display_id           | string | display code |
| first_name           | string | -            |
| last_name            | string | -            |
| updated_at           | string | -            |
| created_at           | string | -            |
| currency_code        | string | -            |
| subtotal             | string | -            |
| shipping_total       | string | -            |
| tax_total            | string | -            |
| total                | string | -            |
| items                | Array  | -            |
| items.title          | string | -            |
| items.description    | string | -            |
| items.thumbnail      | string | -            |
| items.quantity       | number | -            |
| items.unit_price     | string | -            |
| items.original_total | string | -            |
| items.total          | number | -            |

### ORDER.CANCELED
| name                 | type   | des          |
| -------------------- | ------ | ------------ |
| id                   | string | unique id    |


### CUSTOMER.CREATED
| name | descript |
| ---- | -------- |
| asdf | aadfsd   |

### CUSTOMER.PASSWORED_RESET
| name | descript |
| ---- | -------- |
| asdf | aadfsd   |