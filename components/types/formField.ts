export default interface FormField {
    id: string;
    type: 'text' | 'heading' | 'shorttext' | 'longtext' | 'select' | 'checkbox';
    label: string;
    description?: string;
    required?: boolean;
    options?: string[]
}