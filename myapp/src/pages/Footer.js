
function Footer() {
    return (
        <div style={styles.footer}>
            © 2024 My Clinic Application. All rights reserved.
        </div>
    );
}

const styles = {
    footer: {
        padding: '5px',
        textAlign: 'center',
        backgroundColor: '#333',
        color: 'white',
        position: 'fixed',
        width: '100%',
        bottom: '0',
    }
};

export default Footer;
