class ValidatorMessages {
  private messages: string[] = []

  public getMessages(errorObject: any): string[] {
    const errors = errorObject.errors
    this.messages = []
    for (const index in errors) {
      if (Array.isArray(errors[index])) {
        errors[index].forEach((element: string) => {
          this.messages.push(element)
        })
      }
    }
    return this.messages
  }
}

const ValidatorObject = new ValidatorMessages()

export { ValidatorObject }
