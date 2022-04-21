class GradientMixer {
    constructor(container) {
        this._container = container
        this._initialize()
    }

    _initialize() {
        this._initializeContent()
        this._initializeFields()
        this._initializeValues()
        this._initializeHandlers()
    }

    _initializeContent() {
        this._container.innerHTML = `
          <form class="flex-grid">
            <div class="col">
              <div class="g-output">
                <span class="g-output__button">Copy</span>
                <span class="g-output__text"></span>
                <span class="g-icon g-icon--copy"></span>
              </div>
              <fieldset name="radio" class="g-fieldset">
                <div class="g-fieldset--inner">
                  <label class="checked">
                    <input type="radio" name="gradient-type" data-radio="true" value="linear-gradient" checked /> Linear
                  </label>
                  <label>
                    <input type="radio" name="gradient-type" data-radio="true" value="radial-gradient" /> Radial
                  </label>
                </div>
              </fieldset>
            </div>
            <div class="col">
                <fieldset name="color-picker" class="g-fieldset">
                  <div class="g-fieldset--inner">
                      <div class="g-color-picker g-fieldset--frame">
                        <label for="first_color">#1</label>
                        <input type="color" id="first_color" name="color" data-color-picker="true" value="#00C7FD">
                      </div>
                      <div class="g-color-picker g-fieldset--frame">
                        <label for="second_color">#2</label>
                        <input type="color" id="second_color" name="color" data-color-picker="true" value="#E63B7A">
                      </div>
                  </div>
                </fieldset>
                <fieldset name="range" class="g-fieldset g-fieldset--frame g-show-hide col">
                  <div class="g-fieldset--inner">
                      <div><span class="g-input__label">Set angle to</span>
                        <div class="g-input">
                          <button class="g-input__button g-input__button-left" data-type-left="true">&#8678;</button>
                          <button class="g-input__button g-input__button-right" data-type-right="true">&#8680;</button>
                          <input class="g-input__input" type="number" min="0" max="360" value="135">
                        </div><span class="g-input__label">&#32;degree(s)</span>
                      </div>
                      <input class="g-slider" type="range" min="0" max="360" value="135">
                  </div>
                </fieldset>
              </div>
          </form>
        `
    }

    _initializeFields() {
        this._form = this._container.querySelector('form')
        this._colorPickers = this._container.querySelectorAll('[data-color-picker]')
        this._gradientBox = this._container.querySelector('.g-output')
        this._slider = this._container.querySelector('.g-slider')
        this._input = this._container.querySelector('.g-input__input')
        this._outputText = this._container.querySelector('.g-output__text')
        this._copyBtn = this._container.querySelector('.g-output__button')
        this._inputButtonLeft = this._container.querySelector('.g-input__button-left')
        this._inputButtonRight = this._container.querySelector('.g-input__button-right')
        this._fieldsetRadio = this._form.querySelector('fieldset[name="radio"]')
        this._radio = this._form.elements.namedItem('gradient-type')
    }

    _initializeValues() {
        this._colorPickers.forEach(item => {
            item.parentElement.querySelector('label').innerHTML = item.value
        })
        this.updateGradient()
    }

    _initializeHandlers() {
        this._colorPickers.forEach(item => {
            item.addEventListener('input', () => {
                item.parentElement.querySelector('label').innerHTML = item.value
                this.updateGradient()
            })
        })

        this._input.addEventListener('input',   () => this.updateDegreeValue(this._input.value))
        this._input.addEventListener('mouseup', () => this.showHideValue('hide'))
        this._input.addEventListener('keyup',   () => this.showHideValue('hide'))

        this._inputButtonLeft.addEventListener('click', (e) => e.preventDefault())
        this._inputButtonLeft.addEventListener('mousedown', () => {
            parseInt(this._input.value) > parseInt(this._input.min) ? this._input.stepDown() : this._input.value
            this.updateDegreeValue(this._input.value)
        })
        this._inputButtonLeft.addEventListener('mouseup', () => this.showHideValue('hide'))

        this._inputButtonRight.addEventListener('click', (e) => e.preventDefault())
        this._inputButtonRight.addEventListener('mousedown', () => {
            parseInt(this._input.value) < parseInt(this._input.max) ? this._input.stepUp() : this._input.value
            this.updateDegreeValue(this._input.value)
        })
        this._inputButtonRight.addEventListener('mouseup', () => this.showHideValue('hide'))

        this._slider.addEventListener('input',   () => { this.updateDegreeValue(this._slider.value); this.updateGradient() })
        this._slider.addEventListener('mouseup', () => this.showHideValue('hide'))
        this._slider.addEventListener('touchend', () => this.showHideValue('hide'))

        this._fieldsetRadio.addEventListener('change', () => {
            this._fieldsetRadio.querySelectorAll('label').forEach(label =>
                label.classList.remove('checked')
            )
            this._fieldsetRadio.querySelector('input[type=radio]:checked').parentElement.classList.add('checked')

            this.updateGradient()
        })

        this._gradientBox.addEventListener('click', () => {
            navigator.clipboard.writeText(this._gradientBox.style.background).then(() => {
                console.log('Clipboard successfully set')
            }, () => {
                console.log('Clipboard write failed')
            })
            console.log(navigator.clipboard.readText())
            this._copyBtn.innerHTML = 'Copied!'
        })
        this._copyBtn.addEventListener('transitionend', () => {
            if (getComputedStyle(this._copyBtn).opacity === '0') {
                this._copyBtn.innerHTML = 'Copy'
            }
        })
        this._gradientBox.addEventListener('touchstart', () => {
            this._copyBtn.innerHTML = 'Copied!'
        })
    }

    updateDegreeValue(value) {
        const max = parseInt(this._input.max)
        const min = parseInt(this._input.min)
        const valueParsed = parseInt(value)

        if (valueParsed < min || isNaN(valueParsed)) {
            this._input.value  = min
        } else if (valueParsed > max) {
            this._input.value  = max
        } else {
            this._input.value  = valueParsed
        }

        this._slider.value = this._input.value

        this.showHideValue('show')
    }

    showHideValue(state) {
        if (state === 'show') {
            this._outputText.innerHTML = `${this._input.value}&deg;`
            this._outputText.style.opacity = '1'
            this._outputText.style.transition = 'none'
        } else if (state === 'hide') {
            this._outputText.style.opacity = '0'
            this._outputText.style.transition = 'opacity 0.7s ease-in'
        }
    }

    updateGradient() {
        this._colors = Array.from(this._colorPickers).map(item => item.value)
        this._showHideContainer = this._container.querySelector('.g-show-hide')
        this._gradientBox.style.background = this._radio.value === 'linear-gradient' ?
            `${this._radio.value}(${this._input.value}deg, ${this._colors[0]}, ${this._colors[1]})` : `${this._radio.value}(${this._colors[0]}, ${this._colors[1]})`
        this._showHideContainer.style.display = this._radio.value === 'linear-gradient' ? 'flex' : 'none'
				document.body.style.background = "blue";
    }
}

const gradientMixerContainers = document.querySelectorAll('.gradient-mixer')

gradientMixerContainers.forEach(container => {
    new GradientMixer(container)
})
