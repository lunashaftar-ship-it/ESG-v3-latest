'use client'

export function useYearDrillDown(company = 'apple', section = 'environment') {
    const handleYearClick = (_year: number | string) => {
        // no navigation for now
    }

    return {
        handleYearClick,
        company,
        section,
    }
}