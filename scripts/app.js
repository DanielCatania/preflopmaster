const $handsList = document.getElementById("hands_list");
const $legend = document.getElementById("legend");

async function app() {
  try {
    const response = await fetch("../data/poker_hands_data.json");

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const data = await response.json();

    const categoriesDescription = [];

    let index = 1;
    data.categories.map((category) => {
      categoriesDescription.push({ name: category.name, desc: category.desc });

      category.hands.map((hand) => {
        $handsList.innerHTML += `
          <tr style="background-color: ${category.color};">
            <td>${index}</td>
            <td>${hand}</td>
            <td>${category.name}</td>
          </tr>
        `;

        index++;
      });
    });

    data.legend.map((legend) => {
      $legend.innerHTML += `
        <li>
          ${legend}
        </li>
      `;
    });

    categoriesDescription.map((category) => {
      $legend.innerHTML += `
        <li>
          ${category.name} - ${category.desc}
        </li>
      `;
    });
  } catch (error) {
    alert("Não foi possível carregar o app!");
    console.error(error);
    app();
  }
}

app();
