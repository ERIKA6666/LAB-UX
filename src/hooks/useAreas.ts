import { useState, useEffect, useCallback } from 'react';
import { AreaInvestigacion } from '@/types/index';
import { fetchAreasInvestigacion} from '@/services/index'; // Adjust the import path as needed

export const useAreas  = () => {
    const [areas, setAreas] = useState<AreaInvestigacion[]>([]);
    const [loading, setLoading] = useState(false);

    const loadAreas = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchAreasInvestigacion(); 
            if (!response.ok) {
                throw new Error('Failed to fetch areas');
            }
            const data = await response.json();
            setAreas(data);
        } catch (error) {
            console.error('Error loading areas:', error);
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        loadAreas();
    }, [loadAreas]);
    return {
        areas,
        loading,
        reloadAreas: loadAreas,
    };
}