import React from "react";
import ClipboardJS from "clipboard";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
const ShareModal = ({ onClose, url }) => {
  const handleCopyLink = () => {
    // Replace 'your-video-link' with the actual link you want to copy
    const videoLink = url;

    // Use Clipboard.js to copy the link to the clipboard
    const clipboard = new ClipboardJS(".copy-button", {
      text: () => videoLink,
    });

    // Trigger the click event on the copy button
    clipboard.onClick({
      delegateTarget: document.querySelector(".copy-button"),
    });

    // Destroy the Clipboard instance to avoid memory leaks
    clipboard.destroy();
  };

  const handleShareMessenger = () => {
    // Replace 'your-messenger-link' with the actual link you want to share on Messenger
    const messengerLink = url;

    // Use fb-messenger URI scheme to open the Messenger app
    const messengerAppLink = `fb-messenger://share/?link=${encodeURIComponent(
      messengerLink
    )}`;

    // Attempt to open the Messenger app
    window.location.href = messengerAppLink;

    // If the app is not installed, open the Messenger website
    setTimeout(() => {
      window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        messengerLink
      )}`;
    }, 1000);
  };

  const handleShareWhatsApp = () => {
    // Replace 'your-whatsapp-link' with the actual link you want to share on WhatsApp
    const whatsappLink = url;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappLink)}`,
      "_blank"
    );
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container bg-[#ffffff] w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold"></p>
            <button
              className="modal-close-button rounded-full cursor-pointer z-50 bg-red-400 px-3 py-1 text-white"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className="flex gap-4 items-center">
            <button
              className="copy-button bg-gray-400 text-white p-2 rounded"
              onClick={handleCopyLink}
            >
              Copy Link
            </button>
            <FaWhatsapp
              className="text-green-500 text-3xl"
              onClick={handleShareWhatsApp}
            />
            <FaFacebookMessenger
              className="text-3xl text-blue-500"
              onClick={handleShareMessenger}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
