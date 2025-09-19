// Inicializar tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Função para criar toast
function createToast(category, icon, message) {
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div class="toast custom-toast" id="${toastId}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="4000">
            <div class="toast-header">
                <i class="${icon} me-2"></i>
                <strong class="me-auto">${category}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    document.getElementById('toastContainer').insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Remove o toast do DOM após ser escondido
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Função para mostrar conteúdo com spinner
function showContentWithSpinner(contentId, spinnerId, delay = 2000) {
    const spinner = document.getElementById(spinnerId);
    const content = document.getElementById(contentId);
    
    spinner.style.display = 'flex';
    content.style.display = 'none';
    
    setTimeout(() => {
        spinner.style.display = 'none';
        content.style.display = 'block';
    }, delay);
}

// Configurações dos toasts por categoria
const toastConfig = {
    'fiction': {
        icon: 'fas fa-heart',
        message: 'Explore histórias emocionantes de ficção e romance!'
    },
    'mystery': {
        icon: 'fas fa-search',
        message: 'Descubra mistérios intrigantes e thrillers envolventes!'
    },
    'scifi': {
        icon: 'fas fa-rocket',
        message: 'Viaje para o futuro com ficção científica!'
    },
    'biography': {
        icon: 'fas fa-user',
        message: 'Conheça a vida de pessoas extraordinárias!'
    },
    'selfhelp': {
        icon: 'fas fa-lightbulb',
        message: 'Transforme sua vida com livros de desenvolvimento pessoal!'
    }
};

// Event listeners para as pills
document.querySelectorAll('[data-bs-toggle="pill"]').forEach(pill => {
    pill.addEventListener('shown.bs.tab', (e) => {
        const targetId = e.target.getAttribute('data-bs-target').replace('#', '');
        const spinnerId = targetId + '-spinner';
        const contentId = targetId + '-content';
        
        // Mostrar spinner e depois o conteúdo
        showContentWithSpinner(contentId, spinnerId);
        
        // Criar toast
        const config = toastConfig[targetId];
        if (config) {
            setTimeout(() => {
                createToast(
                    targetId.charAt(0).toUpperCase() + targetId.slice(1),
                    config.icon,
                    config.message
                );
            }, 2200);
        }
    });
});

// Mostrar conteúdo inicial (Ficção)
document.addEventListener('DOMContentLoaded', () => {
    showContentWithSpinner('fiction-content', 'fiction-spinner', 1500);
    setTimeout(() => {
        createToast('Ficção', 'fas fa-heart', 'Bem-vindo à nossa biblioteca digital! Comece explorando nossos livros de ficção.');
    }, 1800);
});

// Adicionar efeito de hover nos cards
document.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});