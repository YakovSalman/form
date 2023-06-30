const isCheckboxOrRadio = type => ['checkbox', 'radio'].includes(type);

const {form} = document.forms;

const retrieveFormValue = () => {
    const values = {};

    for (let field of form) {
        const {name} = field;

        if (name) {
            const {type, checked, value} = field;

            values[name] = isCheckboxOrRadio(type) ? checked : value;
        }
    }

    console.log(Object.entries(values) );

}

const formElem = document.querySelectorAll('#form');

formElem.forEach(form => {
    const input = form.querySelectorAll('.form__input');
    const textarea = form.querySelectorAll('.form__input-textarea');
    const inputCheckbox = form.querySelectorAll('.form__input-checkbox');
    const label = form.querySelectorAll('.checkbox__label');
    const modalElem = document.querySelectorAll('.modal');
    let isSubmit = true;

    const submit = () => {

        modalElem.forEach(modal => {
            const modalClose = modal.querySelector('.modal__close');
            const modalBackground = document.querySelector('.modal__background');
            modal.classList.add('active');
            modalBackground.classList.add('active');

            modalClose.addEventListener('click', () => {
                modal.classList.remove('active');
                modalBackground.classList.remove('active');
            })

            modalBackground.addEventListener('click', () => {
                modal.classList.remove('active');
                modalBackground.classList.remove('active');
            });
            form.reset()
        })
    }

    input.forEach(elem => {
        elem.addEventListener('blur', () => {
            if(elem.value !== '' || elem.value === '') {
                elem.classList.remove('active');
                isSubmit = true;
                return
            } else {
                elem.classList.add('active');
            }
        })
    });
    inputCheckbox.forEach(check => {
        check.addEventListener('change', () => {
            label.forEach(label => {
                if(check.checked) {
                    label.style.color = 'white'
                }
            });

        })
    })
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        retrieveFormValue();

        input.forEach(elem => {
            if(elem.value === "") {
                elem.classList.add('active')
                isSubmit = false;
                return
            } else {
                elem.classList.remove('active')
            }
        })

        inputCheckbox.forEach(check => {
            label.forEach(label => {
                if(!check.checked) {
                    label.style.color = 'red'
                } else {
                    label.style.color = 'white'
                }
            });

        })

        if(isSubmit) {
            inputCheckbox.forEach(check => {
                if(check.checked) {
                    submit()
                } else {
                    alert("Confirmation of agreement with the terms");
                }
            })
        }
    });
})
