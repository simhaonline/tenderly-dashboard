import React from 'react';

import {Form, Input, Button} from "../../Elements";

const CreateProjectForm = ({formData = {}, onChange, onSubmit}) => {
    return (
        <Form onSubmit={onSubmit}>
            <Input value={formData.projectName} field={"projectName"} onChange={onChange}/>
            <Input value={formData.projectSlug} field={"projectSlug"} onChange={onChange}/>
            <Button type="submit">
                <span>Create Project</span>
            </Button>
        </Form>
    );
};

export default CreateProjectForm;
