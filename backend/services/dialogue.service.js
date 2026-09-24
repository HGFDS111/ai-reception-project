// Simple rule-based dialogue engine. It can later be replaced with an LLM call:
// the controller only expects { reply, result } back.

const startsWithAny = (words, stems) =>
  words.some((word) => stems.some((stem) => word.startsWith(stem)));

const isExactly = (words, list) => words.some((word) => list.includes(word));

export const generateReply = ({ text, services, script }) => {
  const words = text.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);

  const servicesList = services
    .map((service) => `${service.title} - ${service.BusinessService.price}`)
    .join('; ');

  // 1. Price objection -> the business's objection-handling script
  if (
    startsWithAny(words, ['expens', 'pricey', 'costly', 'think', 'дорог', 'подума']) ||
    (words.includes('too') && (words.includes('much') || words.includes('high')))
  ) {
    return {
      reply:
        script?.objectionFlow ||
        "I understand. Let's find an option that fits your budget.",
    };
  }

  // 2. Client wants to book -> success + upsell
  if (
    startsWithAny(words, ['book', 'appoint', 'reserv', 'schedul', 'запиш', 'записа']) ||
    isExactly(words, ['yes', 'yeah', 'sure', 'ok', 'okay', 'да'])
  ) {
    const upsell =
      services.length > 1
        ? ` By the way, you might also be interested in: ${services[services.length - 1].title}.`
        : '';
    return {
      reply: `Great, I'm booking you in!${upsell}`,
      result: 'booked',
    };
  }

  // 3. Rejection
  if (
    isExactly(words, ['no', 'nope', 'нет']) ||
    startsWithAny(words, ['cancel', 'отмен']) ||
    (words.includes('not') && startsWithAny(words, ['interest']))
  ) {
    return {
      reply: 'No problem, thank you for calling. Feel free to reach out if you change your mind!',
      result: 'rejected',
    };
  }

  // 4. Callback request
  if (
    startsWithAny(words, ['callback', 'перезвон']) ||
    (words.includes('call') && words.includes('back'))
  ) {
    return {
      reply: "Of course, we'll call you back shortly.",
      result: 'callback_requested',
    };
  }

  // 5. Question about prices / services
  if (startsWithAny(words, ['pric', 'cost', 'much', 'service', 'offer', 'цен', 'сколько'])) {
    return {
      reply: servicesList
        ? `Our services: ${servicesList}. Would you like to book?`
        : "The service list is empty for now. Leave your number and we'll call you back.",
    };
  }

  // 6. Default: clarify
  return {
    reply: servicesList
      ? `How can I help you? We offer: ${servicesList}.`
      : 'How can I help you?',
  };
};
