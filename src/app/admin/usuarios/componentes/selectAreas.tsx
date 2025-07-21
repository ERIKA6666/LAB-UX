"use client"
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import { Label } from "@/components/ui/label";
import { AreaInvestigacion, User } from "@/types/index";
import { useAreas } from "@/hooks/useAreas";
import { fetchAreasInvestigacion } from "@/services/index"; // Adjust the import path as needed
import { Check } from "lucide-react";

interface SelectAreasProps {
  formData2: Partial<User>;
  onChange?: (selected: { ID_area: number }[]) => void;
}
export const SelectAreas: React.FC<SelectAreasProps> = ({ formData2 }) => {
    const [areas, setAreas] = useState<AreaInvestigacion[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<{ ID_area: number }[]>(formData2.areas_investigacion || []);

     useEffect(() => {
        fetchAreasInvestigacion().then(setAreas);
        console.log("Areas fetched:", formData2);
      }, []);

    useEffect(() => {
      setSelectedAreas(formData2.areas_investigacion || []);
    }, [formData2.areas_investigacion]);

    const handleToggle = (areaID: number) => {
  let updated;
  if (selectedAreas.some(a => a.ID_area === areaID)) {
    updated = selectedAreas.filter(a => a.ID_area !== areaID);
  } else {
    updated = [...selectedAreas, { ID_area: areaID }];
  }
  setSelectedAreas(updated);
  if (onChange) onChange(updated); // Esto actualiza el estado en el padre
};
  return (
     <div className="flex flex-col gap-6">
      {areas.map((area) => (
        <div className="flex items-center gap-3" key={area.ID}>
          <Checkbox
            id={area.nombre}
            checked={selectedAreas.some(ai => ai.ID_area === area.ID)}
            onCheckedChange={() => handleToggle(area.ID)}
            className="border border-black w-5 h-5 flex items-center justify-center"
          >
            <CheckboxIndicator>
              <Check className="w-4 h-4" />
            </CheckboxIndicator>
          </Checkbox>
          <Label htmlFor={area.nombre}>{area.nombre}</Label>
        </div>
      ))}
    </div>
  );
}
