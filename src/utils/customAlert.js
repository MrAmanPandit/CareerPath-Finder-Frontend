import Swal from 'sweetalert2';

/**
 * Returns a SweetAlert2 configuration object tailored to the current theme
 * @param {string} type - 'success', 'error', 'warning', 'info'
 * @param {string} title - The title of the alert
 * @param {string} text - The body text of the alert
 */
export const showCustomAlert = (type, title, text) => {
    // Check if dark mode is active by looking at the body class
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Define colors based on the theme matching index.css variables
    const background = isDarkMode ? '#1e1e1e' : '#ffffff';
    const color = isDarkMode ? '#f1f1f1' : '#333333';
    const confirmButtonColor = '#007bff'; // You can change this to match your primary button color

    return Swal.fire({
        icon: type,
        title: title,
        text: text,
        background: background,
        color: color,
        confirmButtonColor: confirmButtonColor,
        customClass: {
            popup: isDarkMode ? 'dark-mode-alert' : 'light-mode-alert'
        }
    });
};

export const showSuccessAlert = (message) => {
    return showCustomAlert('success', 'Success!', message);
};

export const showErrorAlert = (message) => {
    return showCustomAlert('error', 'Error!', message);
};

export const showConfirmDialog = (title, text, confirmButtonText = 'Yes, perform action!') => {
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Define colors based on the theme
    const background = isDarkMode ? '#1e1e1e' : '#ffffff';
    const color = isDarkMode ? '#f1f1f1' : '#333333';
    const confirmButtonColor = '#dc3545'; // A red color for destructive actions
    const cancelButtonColor = '#6c757d';

    return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: cancelButtonColor,
        confirmButtonText: confirmButtonText,
        background: background,
        color: color,
        customClass: {
            popup: isDarkMode ? 'dark-mode-alert' : 'light-mode-alert'
        }
    });
};
