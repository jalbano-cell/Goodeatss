export const MENU = [
  {
    cat: 'Small plates',
    items: [
      { id: 1,  name: 'Wood-oven focaccia',    price: 9,  orderable: true,  desc: 'Still-warm from the oven, pooled with good olive oil and flaked salt.' },
      { id: 2,  name: 'Burrata',               price: 16, orderable: true,  desc: 'Pulled fresh daily, with charred cherry tomatoes and bright basil oil.' },
      { id: 3,  name: 'Charred octopus',       price: 18, orderable: true,  desc: 'Slow-braised then kissed by the fire, with lemon and smoked paprika.' },
      { id: 4,  name: 'Beef tartare',          price: 17, orderable: true,  desc: 'Hand-cut, dressed with capers, Dijon, and a silky cured egg yolk.' },
    ],
  },
  {
    cat: 'From the fire',
    items: [
      { id: 5,  name: 'Saffron risotto',       price: 24, orderable: true,  desc: 'Stirred low and slow with bone broth, finished with aged Parmigiano.' },
      { id: 6,  name: 'Wood-grilled branzino', price: 34, orderable: true,  desc: 'Whole fish, crackling skin, with salsa verde and fire-roasted lemon.' },
      { id: 7,  name: 'Braised short rib',     price: 32, orderable: true,  desc: 'Twelve hours in the oven, served with creamy polenta and gremolata.' },
      { id: 8,  name: 'Tagliatelle al ragù',   price: 26, orderable: true,  desc: 'Hand-rolled pasta, slow-cooked beef ragù, house-milled Pecorino.' },
    ],
  },
  {
    cat: 'Sweet',
    items: [
      { id: 9,  name: 'Olive oil cake',        price: 11, orderable: true,  desc: 'Light and fragrant with citrus, a scoop of mascarpone on the side.' },
      { id: 10, name: 'Dark chocolate tart',   price: 12, orderable: true,  desc: 'Silky ganache in a butter crust, finished with smoked sea salt.' },
      { id: 11, name: 'Affogato',              price: 9,  orderable: true,  desc: 'A double shot of espresso poured over house-churned vanilla gelato.' },
    ],
  },
  {
    cat: 'Wine & aperitivo',
    dineIn: true,
    items: [
      { id: 12, name: 'House negroni',         price: 15, orderable: false, desc: 'Our take on the classic — stirred cold, served over a large cube.' },
      { id: 13, name: 'Red of the day',        price: 14, orderable: false, desc: "Ask your server — we pick what's drinking well tonight." },
      { id: 14, name: 'White of the day',      price: 14, orderable: false, desc: 'Crisp, mineral, and seasonal. Poured generously.' },
    ],
  },
]

export const allItems = () => MENU.flatMap(c => c.items)
