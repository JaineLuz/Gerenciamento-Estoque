//Adicionar superusuario
document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#cadastrar');
    console.log(form);


    form.addEventListener('click', async (e) => {
        e.preventDefault();

        const nome = document.querySelector('#nome').value;
        const email = document.querySelector('#email').value;
        const senha = document.querySelector('#senha').value;
        console.log(nome, email, senha);

        try {

            const response = await fetch('http://localhost:3000/superusuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                console.log(data.message);
                alert('Cadastro realizado com sucesso!');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro no servidor. Tente novamente!');
        }
    });
});

