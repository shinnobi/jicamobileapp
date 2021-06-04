import { Constants } from '../utils/Omni';
export const checkLoading = time => {
    const now = Date.now();
    return time && now >= time && now - time <= Constants.timeout;
};