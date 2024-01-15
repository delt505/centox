import { Box, Group, Text } from "@mantine/core";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TbGripVertical } from "react-icons/tb";
import Form from "../../../../types/form"
import FormField from '../../../../types/formField';
import AddFieldButton from "./AddFieldButton";
import Field from "./Field";
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteForever } from "react-icons/md";

export default function FormFields({ form, setForm }: { form: Form, setForm: (form: Form) => void }) {


    const [fields, setFields] = useState(form.fields || []);

    function handleOnDragEnd(result: any) {
      if (!result.destination) return;
  
      const items = Array.from(fields);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
      setFields(items);
      setForm({...form, fields: items})
    }

    function handleAddField(type: FormField['type']) {
        const newField = {
            id: uuidv4().toString(),
            type: type,
            label: ''
        }

        setFields([...fields, newField])
        setForm({...form, fields: [...fields, newField]})
    }

    function handleUpdateField(field: FormField) {
        const newFields: FormField[] = []
        const fieldList: FormField[] = [...fields]
        fieldList.forEach(f => {
            if (f.id === field.id) newFields.push(field);
            else newFields.push(f);
        })

        setFields(newFields)
        setForm({...form, fields: newFields})
    }

    function handleDeleteField(field: FormField){
        const newFields: FormField[] = []
        const fieldList: FormField[] = [...fields]
        fieldList.forEach(f => {
            if (f.id !== field.id) newFields.push(f);
        })

        setFields(newFields)
        setForm({...form, fields: newFields})
    }

    return (
        <Group position="center" direction="column" mt='xl'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="fields-list" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {fields.map((field, index) => {
                                return (
                                    <Draggable key={field.id} draggableId={field.id} index={index}>
                                        {(provided) => (
                                            <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: '0.25rem',
                                                padding: '1rem',
                                                backgroundColor: '#f8f9fa',
                                                gap: '1rem',
                                                minWidth: '500px',
                                                margin: '0.5rem 0',
                                            }}>
                                                <Box component={TbGripVertical} size={18} sx={{
                                                    color: '#343a40',
                                                    cursor: 'grab',
                                                    '&:hover': {
                                                        opacity: 0.9
                                                    }
                                                }}/>
                                                <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
                                                    <Text size={'xs'} weight={700} sx={{ color: '#495057', marginBottom: '-1rem', paddingLeft: '2px', textTransform: 'uppercase'}}>{field.type}</Text>
                                                    <Field handleUpdateField={handleUpdateField} field={field}/>
                                                </Box>
                                                <Box component={MdDeleteForever} size={18} sx={{
                                                    color: '#ff5555',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        opacity: 0.9
                                                    }
                                                }} onClick={() => handleDeleteField(field)}/>
                                            </Box>
                                        )}
                                    </Draggable>
                                )
                            })}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <AddFieldButton handleAddField={handleAddField}/>
        </Group>
    )
}