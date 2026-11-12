
import Card from "./Card.jsx";
import { useState, useEffect } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [randomCard, setRandomCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Formulário
  const [name, setName] = useState("");
  const [type, setType] = useState("Criatura");
  const [attack, setAttack] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setRandomCard(null);

    const url =
      filter === "Todas"
        ? "http://localhost:3000/api/cartas"
        : `http://localhost:3000/api/cartas?tipo=${filter}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then((data) => setCards(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filter]);

  const visible = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  function chooseRandomCard() {
    setRandomCard(null);

    fetch("http://localhost:3000/api/cartas/aleatoria")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then((data) => setRandomCard(data))
      .catch((err) => setError(err.message));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const card = {
      name: name,
      type: type,
      attack: Number(attack)
    };

    setCards([...cards, card]);

    setName("");
    setType("Criatura");
    setAttack("");
  }

  return (
    <main>
      <p>
        Aparecem: {cards.length} cartas.
        Visíveis: {visible.length} cartas.
      </p>

      {loading && <p>A carregar…</p>}

      {error && <p>Erro: {error}</p>}

      {!loading && !error && (
        <>
          <h2>Adicionar carta</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome da carta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Criatura">Criatura</option>
              <option value="Feitiço">Feitiço</option>
              <option value="Toze">Toze</option>
            </select>

            <input
              type="number"
              placeholder="Ataque"
              value={attack}
              onChange={(e) => setAttack(e.target.value)}
              required
            />

            <button type="submit">Adicionar carta</button>
          </form>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar"
          />

          <div>
            <button onClick={() => setFilter("Todas")}>
              Todas
            </button>

            <button onClick={() => setFilter("Criatura")}>
              Só criaturas
            </button>

            <button onClick={() => setFilter("Feitiço")}>
              Só feitiços
            </button>

            <button onClick={() => setFilter("Toze")}>
              Só Tozés
            </button>

            <button onClick={chooseRandomCard}>
              Carta à sorte
            </button>
          </div>

          {randomCard && (
            <div>
              <h2>Carta à sorte</h2>
              <Card {...randomCard} />
            </div>
          )}

          <ul>
            {visible.map((card, index) => (
              <Card
                key={card.name + index}
                name={card.name}
                attack={card.attack}
                type={card.type}
              />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default App;
