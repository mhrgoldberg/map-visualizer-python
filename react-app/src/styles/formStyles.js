import styled from 'styled-components'

export const FormContainer = styled.div`
  /* layout (Container Grid)*/
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 10rem minmax(20rem, 1fr) 10rem;
  justify-items: center;
  width: 100%;
  max-width: 120rem;
  min-height: 50rem;
  margin: auto;

  .header {
    /* container grid placement */
    grid-column: 1;
    grid-row: 1;
    /* layout */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  form {
    /* layout (Form Grid)*/
    grid-column: 1;
    grid-row: 2;
  }
`

export const FormInputContainer = styled.div`
  /* layout */
  height: fit-content;
  width: calc(100% - 2rem);
  display: grid;
  grid-template-rows: auto;

  .formFieldError {
    border-bottom: 0.2rem solid var(--primary-alert) !important;
    ::placeholder {
      color: var(--primary-alert);
    }
  }

  label {
    width: 100%;
    font-size: 2.2rem;
    color: var(--primary-light);
  }
`
