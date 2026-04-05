import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './ImageCropper.css';

const ImageCropper = ({ image, onCropDone, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createFile = async () => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = image;

            await new Promise((resolve) => {
                img.onload = resolve;
            });

            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;

            ctx.drawImage(
                img,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );

            canvas.toBlob((blob) => {
                const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
                onCropDone(file, URL.createObjectURL(blob));
            }, 'image/jpeg');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="cropper-modal-overlay">
            <div className="cropper-container-card glass-card">
                <div className="cropper-header">
                    <h3>Crop Profile Picture</h3>
                    <p>Drag and zoom to perfectly frame your photo</p>
                </div>

                <div className="cropper-wrapper">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropShape="round"
                        showGrid={false}
                    />
                </div>

                <div className="cropper-controls">
                    <div className="zoom-control">
                        <span>Zoom</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(e.target.value)}
                            className="zoom-range"
                        />
                    </div>

                    <div className="cropper-actions">
                        <button className="cropper-btn-cancel" onClick={onCancel}>
                            Cancel
                        </button>
                        <button className="cropper-btn-done" onClick={createFile}>
                            Apply Crop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
