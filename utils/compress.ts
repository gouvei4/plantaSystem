import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const imageCompress = async (uri: string) => {
    const manipResult = await manipulateAsync(uri, [], {
        compress: 0.5,
        format: SaveFormat.JPEG,
        base64: true,
    });
    return manipResult;
};

export { imageCompress };
