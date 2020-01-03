//json-generator.com


/**
 * 
 * 
 * 
 * 
[
  '{{repeat(100)}}',
  {
    id: '{{objectId()}}',
    name: '{{firstName()}}',
    surname: '{{surname()}}',
    phone: '+48 {{phone()}}',
    email: '{{email()}}',
    rating: '{{integer(0, 10)}}',
    birthDate: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss")}}',
    creationDate: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss")}}',
    lastUpdate: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss")}}',
    gender: '{{random("male", "female")}}',
    isActive: '{{bool()}}',
    countries: [
      '{{repeat(integer(1, 4))}}','{{country()}}'
    ]
  }
]
 * 
 * 
 * 
 */