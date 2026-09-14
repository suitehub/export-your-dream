export type Product = {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  sku: string;
  discount: number;
  oldPrice: number;
  price: number;
  installments: number;
  rating: number;
  reviews: number;
  shortDescription: string;
  description: string[];
  benefits: string[];
  composition: string[];
  usage: string[];
  imagePosition: string;
  galleryPositions: string[];
};

export const products: Product[] = [
  {
    id: 1,
    slug: "super-cha-emagrecedor-natural",
    name: "Super Chá Emagrecedor Natural",
    subtitle: "Suplemento alimentar natural",
    category: "Emagrecedores",
    sku: "VC-SUPERCHA-001",
    discount: 57,
    oldPrice: 65,
    price: 28,
    installments: 6,
    rating: 4.5,
    reviews: 128,
    shortDescription:
      "Auxilia no controle do apetite, acelera o metabolismo e contribui para o bem-estar do seu corpo de forma natural.",
    description: [
      "O Super Chá Emagrecedor Natural é um suplemento alimentar desenvolvido com ingredientes naturais que auxiliam no controle do apetite, aceleram o metabolismo e contribuem para o bem-estar do seu corpo.",
      "Uma fórmula completa para quem busca mais saúde, equilíbrio e qualidade de vida de forma natural.",
    ],
    benefits: [
      "Auxilia no controle do apetite",
      "Acelera o metabolismo",
      "Contribui para o bem-estar",
      "Fórmula natural e segura",
    ],
    composition: ["Extrato de chá verde", "Hibisco", "Gengibre", "Cavalinha", "Cápsula vegetal 500mg"],
    usage: [
      "Tomar 1 cápsula antes do café da manhã.",
      "Tomar 1 cápsula antes do almoço com um copo de água.",
      "Manter alimentação equilibrada e boa hidratação.",
    ],
    imagePosition: "0%",
    galleryPositions: ["0%", "20%", "40%", "60%"],
  },
  {
    id: 2,
    slug: "cactinea-drenagem-linfatica",
    name: "Cactinea — Drenagem Linfática",
    subtitle: "Suplemento alimentar natural",
    category: "Detox",
    sku: "VC-CACTINEA-002",
    discount: 54,
    oldPrice: 55,
    price: 25,
    installments: 5,
    rating: 4.5,
    reviews: 96,
    shortDescription:
      "Ajuda a reduzir a retenção de líquidos, favorece a drenagem linfática e a sensação de leveza no dia a dia.",
    description: [
      "O Cactinea é um suplemento natural indicado para quem sente inchaço e retenção de líquidos, favorecendo a eliminação de toxinas pelo organismo.",
      "Com ativos de origem vegetal, apoia a circulação e a sensação de leveza durante o dia.",
    ],
    benefits: [
      "Reduz a retenção de líquidos",
      "Favorece a drenagem linfática",
      "Auxilia na sensação de leveza",
      "Fórmula natural e segura",
    ],
    composition: ["Extrato de cactinea", "Chá verde", "Dente-de-leão", "Cápsula vegetal 500mg"],
    usage: ["Tomar 1 cápsula pela manhã.", "Tomar 1 cápsula à tarde com água.", "Beber ao menos 2 litros de água por dia."],
    imagePosition: "20%",
    galleryPositions: ["20%", "0%", "60%", "80%"],
  },
  {
    id: 3,
    slug: "colunex-curcuma-extra-forte",
    name: "Colunex — Cúrcuma Extra Forte",
    subtitle: "Suplemento alimentar natural",
    category: "Coluna",
    sku: "VC-COLUNEX-003",
    discount: 62,
    oldPrice: 68,
    price: 26,
    installments: 5,
    rating: 5,
    reviews: 164,
    shortDescription:
      "Formulado com cúrcuma extra forte para apoiar o conforto das articulações e da coluna no dia a dia.",
    description: [
      "O Colunex reúne cúrcuma extra forte e ativos naturais que apoiam o conforto articular e a disposição para a rotina.",
      "Indicado para quem busca mais mobilidade e bem-estar de forma natural.",
    ],
    benefits: [
      "Apoia o conforto articular",
      "Contribui para a mobilidade",
      "Ação antioxidante natural",
      "Fórmula natural e segura",
    ],
    composition: ["Cúrcuma longa", "Pimenta preta", "Gengibre", "Cápsula vegetal 500mg"],
    usage: ["Tomar 1 cápsula após o almoço.", "Tomar 1 cápsula após o jantar.", "Uso contínuo recomendado."],
    imagePosition: "40%",
    galleryPositions: ["40%", "20%", "0%", "100%"],
  },
  {
    id: 4,
    slug: "fiocaps-vitamina-completa",
    name: "Fiocaps — Vitamina Completa",
    subtitle: "Suplemento alimentar natural",
    category: "Vitaminas",
    sku: "VC-FIOCAPS-004",
    discount: 55,
    oldPrice: 60,
    price: 27,
    installments: 5,
    rating: 4.5,
    reviews: 87,
    shortDescription:
      "Complexo vitamínico completo para fortalecer cabelos, unhas e a sua energia diária.",
    description: [
      "O Fiocaps é um complexo vitamínico completo que reúne vitaminas e minerais essenciais para o organismo.",
      "Apoia a força dos cabelos e unhas e a disposição do dia a dia.",
    ],
    benefits: ["Fortalece cabelos e unhas", "Mais energia e disposição", "Apoia a imunidade", "Fórmula natural e segura"],
    composition: ["Biotina", "Vitaminas do complexo B", "Zinco", "Cápsula vegetal 500mg"],
    usage: ["Tomar 1 cápsula ao dia.", "Preferencialmente após o café da manhã.", "Uso contínuo recomendado."],
    imagePosition: "60%",
    galleryPositions: ["60%", "40%", "80%", "0%"],
  },
  {
    id: 5,
    slug: "dolomita-calcio-e-magnesio",
    name: "Dolomita — Cálcio e Magnésio",
    subtitle: "Suplemento alimentar natural",
    category: "Beleza e Bem Estar",
    sku: "VC-DOLOMITA-005",
    discount: 44,
    oldPrice: 45,
    price: 25,
    installments: 5,
    rating: 4.5,
    reviews: 74,
    shortDescription:
      "Cálcio e magnésio de origem natural para apoiar ossos, músculos e o equilíbrio do organismo.",
    description: [
      "A Dolomita combina cálcio e magnésio de origem natural, minerais essenciais para ossos e músculos.",
      "Uma escolha simples para manter o equilíbrio do corpo em todas as fases da vida.",
    ],
    benefits: ["Apoia ossos e músculos", "Contribui para o equilíbrio", "Minerais de origem natural", "Fórmula natural e segura"],
    composition: ["Cálcio", "Magnésio", "Dolomita natural", "Cápsula vegetal 500mg"],
    usage: ["Tomar 1 cápsula após o almoço.", "Tomar 1 cápsula após o jantar.", "Manter boa hidratação."],
    imagePosition: "80%",
    galleryPositions: ["80%", "60%", "20%", "40%"],
  },
  {
    id: 6,
    slug: "super-slim-x",
    name: "Super Slim X",
    subtitle: "Suplemento alimentar natural",
    category: "Emagrecedores",
    sku: "VC-SLIMX-006",
    discount: 60,
    oldPrice: 70,
    price: 28,
    installments: 6,
    rating: 5,
    reviews: 142,
    shortDescription:
      "Fórmula termogênica natural que apoia o metabolismo e a saciedade ao longo do dia.",
    description: [
      "O Super Slim X é uma fórmula termogênica natural que apoia o metabolismo e ajuda a manter a saciedade.",
      "Indicado para quem busca resultados com constância, aliado a hábitos saudáveis.",
    ],
    benefits: ["Apoia o metabolismo", "Ajuda na saciedade", "Mais disposição no dia", "Fórmula natural e segura"],
    composition: ["Café verde", "Chá verde", "Pimenta caiena", "Cápsula vegetal 500mg"],
    usage: ["Tomar 1 cápsula antes do café da manhã.", "Tomar 1 cápsula antes do almoço.", "Evitar o uso à noite."],
    imagePosition: "100%",
    galleryPositions: ["100%", "80%", "0%", "40%"],
  },
];

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
