
import React from 'react';

function Footer() {
    return (
        <footer style={styles.footer}>
            <p>© 2024 My WebApp. All rights reserved.</p>
        </footer>
    );
}

const styles = {
    footer: {
        padding: '0px',
        textAlign: 'center',
        backgroundColor: '#333',
        color: 'white',
        position: 'fixed',
        width: '100%',
        bottom: '0',
    }
};

export default Footer;
