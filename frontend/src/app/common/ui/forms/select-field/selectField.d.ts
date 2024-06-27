export type OneObjectType = {
    id: number, 
    text: string, 
    value: string, 
} 
  
export type SelectFieldProps = {
    title?: string;
    name: string;
    options: Array<OneObjectType>;
    register: any; 
    classes: string; 
    labelTextStyle: string; 
    selectCompWidth?: string; 
};