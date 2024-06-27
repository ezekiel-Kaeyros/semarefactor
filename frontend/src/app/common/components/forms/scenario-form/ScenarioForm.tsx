import { useForm } from 'react-hook-form';
import { ScenarioInput, QuestionModel, ResponseModel } from './ScenarioForm.d';
import InputFieldScenario from './InputFieldScenario';
import { useId } from 'react';

const ScenarioForm = () => {
    useId
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm<ScenarioInput>();

  let table: QuestionModel[] = [];

    const addQuestion = () => {
      
  };
  const ResponseQuestion = () => {};
  const RemoveQuestion = () => {};
  const RemoveResponse = () => {};

  return (
    <div>
      <InputFieldScenario />
    </div>
  );
};

export default ScenarioForm;
