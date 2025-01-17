//Adicionar superusuario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form-login');


    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.querySelector('#email').value;
        const senha = document.querySelector('#senha').value;

        console.log('Resposta: ', email, senha);
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, senha: senha }), // Enviando os dados de login

            });
            console.log("Resposta do servidor:", response);
            const data = await response.json();

            if (data.auth == true) {
                window.location.href = "/estoque";

            } else {
                console.error('Erro ao buscar superUsuarios:', response.status);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro no login. Usuário inexistente.');
        }
    });
});


function abrirFormulario() {
    const modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
    document.getElementById('form-login').reset();
    modal.show();
}
