`use strict`
{
  let scores = 0;
  let time = 0
  const loading = () => {
    document.querySelector(`input`).addEventListener(`click`, async function () {
      document.querySelector(`input`).remove()
      document.querySelector(`h1`).textContent = "取得中"
      document.querySelectorAll(`p`)[2].textContent = "少々お待ち下さい"
      const res = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
      const qs = await res.json();
      const results = qs.results
      scores = 0
      time = 0

      const add = (index) => {
        document.querySelector(`form`).remove()
        const form = document.createElement(`form`)
        document.querySelector(`div`).appendChild(form)
        document.querySelectorAll(`p`)[0].textContent = `【ジャンル】${results[index].category}`
        document.querySelectorAll(`p`)[1].textContent = `【難易度】${results[index].difficulty}`
        document.querySelectorAll(`p`)[2].textContent = results[index].question
        document.querySelector(`h1`).textContent = `問題${index + 1}`

        const answers = []
        answers.push(results[index].correct_answer)
        Array.prototype.push.apply(answers, results[index].incorrect_answers)

        const shuffleAnswers = []
        for (let i = 0; i < 4; i++) {
          shuffleAnswers[i] = answers.splice(Math.floor(Math.random() * answers.length), 1)
        }

        for (let i = 0; i < 4; i++) {
          const button = document.createElement(`input`)
          if (shuffleAnswers[i] == results[index].correct_answer) {
            button.classList.add(`correct`)
          }
          button.value = shuffleAnswers[i]
          button.type = `button`;
          button.id = `i`
          document.querySelector(`form`).appendChild(button)
        }
      }


      const result = () => {
        document.querySelector(`form`).remove()
        const form = document.createElement(`form`)
        document.querySelector(`div`).appendChild(form)
        const input = document.createElement(`input`);
        input.value = `ホームへ戻る`
        input.type = `button`
        form.appendChild(input)
        document.querySelectorAll(`p`)[0].textContent = ``
        document.querySelectorAll(`p`)[1].textContent = ``
        document.querySelectorAll(`p`)[2].textContent = `再チャレンジしたい場合は以下をクリック`
        document.querySelector(`h1`).textContent = `あなたの正解数は${scores}です！`
        input.addEventListener(`click`, () => {
          home();
        })
      }

      const home = () => {
        document.querySelector(`h1`).textContent = `ようこそ`
        document.querySelectorAll(`p`)[2].textContent = `以下をクリック`
        const input = document.querySelector(`input`);
        input.value = `開始`
        loading();
      }


      const addQuestions = () => {
        add(time);
        document.querySelectorAll(`input`).forEach((answer) => {
          answer.addEventListener(`click`, () => {
            if (time === 9 && answer.className == `correct`) {
              scores++;
              result()
            } else if (time === 9) {
              result()
            } else if (answer.className === `correct`) {
              scores++;
              time++
              addQuestions()
            } else {
              time++
              addQuestions()
            }
          })
        })
      }
      addQuestions()
    })
  }
  loading();
}
