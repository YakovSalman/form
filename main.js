const isCheckboxOrRadio = type => ['checkbox', 'radio'].includes(type);
const {form} = document.forms;

function retrieveFormValue() {
    const values = {};

    for (let field of form) {
        const {name} = field;

        if (name) {
            const {type, checked, value} = field;

            values[name] = isCheckboxOrRadio(type) ? checked : value;
        }
    }
    // console.log(values)
}



const formElem = document.querySelectorAll('#form');

formElem.forEach(form => {
    const input = form.querySelectorAll('.form__input');
    const inputCheckbox = form.querySelectorAll('.form__input-checkbox');
    const label = form.querySelectorAll('.checkbox__label');
    const send = form.querySelectorAll('.send');


    const submit = () => {
        input.forEach(input => {
            inputCheckbox.forEach(check => {
                if(
                    input.value != '' &&
                    check.checked
                ) {
                    modal()
                } else {
                    send.forEach(item => {
                        item.classList.remove('active');
                    })
                }
            })
        });

        form.reset();
    }

    input.forEach(input => {
        input.addEventListener('blur', () => {
            if(input.value !== '' || input.value === '') {
                input.classList.remove('active');
            } else {
                input.classList.add('active');
            }
        })
    });
    inputCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            label.forEach(label => {
                if(checkbox.checked) {
                    label.style.color = 'white'
                }
            });

        })
    })
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        retrieveFormValue()

        input.forEach(input => {
            if(input.value == '') {
                input.classList.add('active')
            } else {
                input.classList.remove('active')
            }
        })

        inputCheckbox.forEach(checkbox => {
            label.forEach(label => {
                if(!checkbox.checked) {
                    label.style.color = 'red'
                } else {
                    label.style.color = 'white'
                }
            });

        })

        submit()

    });

})



function modal () {
    const modal = document.querySelectorAll('.modal');

    modal.forEach(modal => {
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
    })
}