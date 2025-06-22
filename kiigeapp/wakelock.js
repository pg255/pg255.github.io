let wakeLock = null; // Variable to store the WakeLockSentinel object

// Get references to the HTML elements once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const requestWakeLockButton = document.getElementById('requestWakeLockButton');
    const releaseWakeLockButton = document.getElementById('releaseWakeLockButton');
    const statusElement = document.getElementById('status');

    /**
     * Attempts to request a screen wake lock.
     * The wake lock will prevent the device screen from dimming or turning off.
     */
    const requestWakeLock = async () => {
        // Check if the Wake Lock API is supported by the browser
        if ('wakeLock' in navigator) {
            try {
                // Request a 'screen' wake lock.
                // The Promise resolves with a WakeLockSentinel object if successful.
                wakeLock = await navigator.wakeLock.request('screen');

                // Add an event listener for when the wake lock is released by the system
                // (e.g., user switches tabs, low battery, etc.)
                wakeLock.addEventListener('release', () => {
                    statusElement.textContent = 'Wake Lock Status: Released (by system or manually)';
                    console.log('Screen Wake Lock released:', wakeLock.released);
                    // Re-enable the request button and disable the release button
                    if (releaseWakeLockButton) releaseWakeLockButton.disabled = true;
                    if (requestWakeLockButton) requestWakeLockButton.disabled = false;
                });

                // Update UI to reflect the active wake lock
                statusElement.textContent = 'Wake Lock Status: Active';
                console.log('Screen Wake Lock active');
                // Disable the request button and enable the release button
                if (requestWakeLockButton) requestWakeLockButton.disabled = true;
                if (releaseWakeLockButton) releaseWakeLockButton.disabled = false;

            } catch (err) {
                // Handle errors if the wake lock request fails (e.g., permission denied,
                // power saver mode, low battery, page not visible).
                statusElement.textContent = `Wake Lock Status: Error (${err.name}, ${err.message})`;
                console.error(`Failed to request wake lock: ${err.name}, ${err.message}`);
                // Ensure buttons are in appropriate state if request failed
                if (releaseWakeLockButton) releaseWakeLockButton.disabled = true;
                if (requestWakeLockButton) requestWakeLockButton.disabled = false;
            }
        } else {
            // Inform the user if the Wake Lock API is not supported
            statusElement.textContent = 'Wake Lock Status: Not supported by your browser.';
            console.warn('Screen Wake Lock API not supported in this browser.');
            // Disable buttons if not supported
            if (requestWakeLockButton) requestWakeLockButton.disabled = true;
            if (releaseWakeLockButton) releaseWakeLockButton.disabled = true;
        }
    };

    /**
     * Releases the currently held screen wake lock, allowing the device
     * screen to dim or turn off normally.
     */
    const releaseWakeLock = () => {
        if (wakeLock) {
            // Call the release() method on the WakeLockSentinel object
            wakeLock.release()
                .then(() => {
                    wakeLock = null; // Clear the reference
                    statusElement.textContent = 'Wake Lock Status: Released manually';
                    console.log('Screen Wake Lock released manually');
                    // Re-enable the request button and disable the release button
                    if (releaseWakeLockButton) releaseWakeLockButton.disabled = true;
                    if (requestWakeLockButton) requestWakeLockButton.disabled = false;
                })
                .catch((err) => {
                    // Handle errors during release
                    statusElement.textContent = `Wake Lock Status: Error releasing (${err.name}, ${err.message})`;
                    console.error(`Error releasing wake lock: ${err.name}, ${err.message}`);
                });
        }
    };

    // Attach event listeners to the buttons for user interaction
    if (requestWakeLockButton) {
        requestWakeLockButton.addEventListener('click', requestWakeLock);
    }
    if (releaseWakeLockButton) {
        releaseWakeLockButton.addEventListener('click', releaseWakeLock);
    }

    /**
     * Handles changes in the document's visibility state.
     * If the document becomes visible and a wake lock was previously active,
     * it attempts to re-acquire the lock.
     */
    document.addEventListener('visibilitychange', async () => {
        // If the document becomes visible and we had an active wake lock before,
        // try to re-acquire it, as it might have been released by the system.
        if (wakeLock !== null && document.visibilityState === 'visible') {
            console.log('Document became visible, attempting to re-acquire wake lock.');
            await requestWakeLock();
        } else if (wakeLock !== null && document.visibilityState === 'hidden') {
            // If the page becomes hidden, the lock is usually released automatically.
            // We update the status to reflect this.
            statusElement.textContent = 'Wake Lock Status: Inactive (page hidden)';
            if (releaseWakeLockButton) releaseWakeLockButton.disabled = true;
            if (requestWakeLockButton) requestWakeLockButton.disabled = false;
        }
    });

    // Initial check for wake lock support when the script loads
    if (!('wakeLock' in navigator)) {
        if (statusElement) statusElement.textContent = 'Wake Lock Status: Not supported by your browser.';
        if (requestWakeLockButton) requestWakeLockButton.disabled = true;
        if (releaseWakeLockButton) releaseWakeLockButton.disabled = true;
    }
});