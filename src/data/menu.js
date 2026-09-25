/**
 * Хардкод-меню. В будущем этот массив заменится запросом к API
 * (fetch('/api/menu')) — компоненты при этом не поменяются,
 * если сохранить форму объекта.
 *
 * Контракт MenuItem:
 *   id          string  — уникальный ключ (используется в корзине и как React key)
 *   name        string
 *   description string
 *   price       number  — в рублях, целое
 *   image       string  — открытый URL Unsplash (без API-ключа)
 *   tag         string? — бейдж на карточке
 */

// Хелпер: собирает URL Unsplash CDN с нужной шириной и обрезкой.
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`

export const MENU = [
  {
    id: 'thunder-plov',
    name: 'Плов «Thunder Slam»',
    description: 'Ферганский плов с бараниной, жёлтой морковью и нутом. Порция, после которой хочется данк.',
    price: 590,
    image: unsplash('1512058564366-18510be2db19'),
    tag: 'Хит сезона',
  },
  {
    id: 'shashlik-alley-oop',
    name: 'Шашлык «Alley-Oop»',
    description: 'Три шампура из маринованной баранины на углях. Подаём парой — как идеальный пас.',
    price: 720,
    image: unsplash('1555939594-58d7cb561ad1'),
    tag: 'С огня',
  },
  {
    id: 'samsa-three-pointer',
    name: 'Самса «Трёхочковая»',
    description: 'Три слоёные самсы из тандыра: говядина, тыква и сыр. Каждая — точно в корзину.',
    price: 360,
    image: unsplash('1601050690597-df0568f70950'),
  },
  {
    id: 'manty-full-court',
    name: 'Манты «Full Court Press»',
    description: 'Шесть мант на пару с рубленой бараниной и курдючным жиром. Прессинг по всей тарелке.',
    price: 480,
    image: unsplash('1496116218417-1a781b1c416c'),
  },
  {
    id: 'lagman-fast-break',
    name: 'Лагман «Fast Break»',
    description: 'Тянутая вручную лапша, говядина, болгарский перец и острый соус. Быстрый отрыв гарантирован.',
    price: 450,
    image: unsplash('1569718212165-3a8278d5f624'),
    tag: 'Острое',
  },
  {
    id: 'non-slam-dunk',
    name: 'Лепёшка «Slam Dunk»',
    description: 'Горячая нон прямо из тандыра, с кунжутом и узором «чекич». Наш официальный мяч.',
    price: 120,
    image: unsplash('1509440159596-0249088772ff'),
  },
  {
    id: 'achichuk-rebound',
    name: 'Салат «Ачичук Rebound»',
    description: 'Помидоры, сладкий лук и зелень. Лёгкий подбор после тяжёлого плова.',
    price: 240,
    image: unsplash('1540189549336-e6e99c3679fe'),
  },
  {
    id: 'green-tea-timeout',
    name: 'Зелёный чай «Time-Out»',
    description: 'Чайник зелёного чая с лимоном и набатом. Берите тайм-аут и отдыхайте.',
    price: 150,
    image: unsplash('1556679343-c7306c1976bc'),
  },
]
