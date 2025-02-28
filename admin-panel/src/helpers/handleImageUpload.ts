import { Dispatch, SetStateAction } from "react";

export const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>,
    setImage: Dispatch<SetStateAction<string>>,
) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader()
        reader.onload = (e) => {
            setImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
};