
const ADJECTIVES = [
    "Cepat", "Ceria", "Pintar", "Berani", "Tenang", 
    "Gesit", "Ramah", "Kreatif", "Hebat", "Unik"
];

const ANIMALS = [
    "Kucing", "Panda", "Elang", "Singa", "Rubah", 
    "Kelinci", "Serigala", "Harimau", "Lumba", "Merpati"
];

export function generateGuestName() {
    const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const number = Math.floor(Math.random() * 1000);

    return `${adjective}${animal}${number}`;
}