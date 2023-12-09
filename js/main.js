const inputs = document.querySelectorAll('input');

function handleUpdate() {
    const suffix = this.dataset.suffix || '';
    document.documentElement.style.setProperty(`--${this.id}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));