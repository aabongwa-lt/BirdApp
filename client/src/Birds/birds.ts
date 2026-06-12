import type {Bird} from "../api/types/types.ts";

const fetchBirds = async (): Promise<Bird[]> => {
    const response = await fetch("http://localhost:5177/api/Bird");
    return await response.json();
}

const fetchBirdById = async (id: number): Promise<Bird> => {
    const response = await fetch(`http://localhost:5177/birds/${id}`);
    return await response.json();
}

export { fetchBirds, fetchBirdById };