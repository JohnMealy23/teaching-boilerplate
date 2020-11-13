const radioButtonGroupName = 'temperature'

export const radioTemp = (tempChoice, tempUnit) => {
    const createButton = document.createElement('input')
    createButton.type = 'radio'
    createButton.id = tempChoice  
    createButton.name = radioButtonGroupName
    createButton.value = tempUnit
    document.body.appendChild(createButton)
    const createButtonLabel = document.createElement('label')
    createButtonLabel.innerText = tempChoice
    document.body.appendChild(createButtonLabel)
    return createButton.value
}

/* <div>
  <input type="radio" id="louie" name="drone" value="louie">
  <label for="louie">Louie</label>
</div> */