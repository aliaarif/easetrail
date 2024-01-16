<!-- components/Faq.vue -->
<template>
    <div>
      <h2 class="title">Frequently Asked Questions</h2>
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <div class="faq-question" @click="toggleFAQ(index)">
          {{ faq.question }}
        </div>
        <div v-if="faq.isOpen" class="faq-answer">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        faqs: [
          { question: 'Question 1?', answer: 'Answer to question 1.', isOpen: false },
          { question: 'Question 2?', answer: 'Answer to question 2.', isOpen: false },
          // Add more FAQs as needed
        ]
      };
    },
    methods: {
      toggleFAQ(index) {
        this.faqs[index].isOpen = !this.faqs[index].isOpen;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom CSS for FAQ styling */
  .faq-item {
    margin-bottom: 1em;
  }
  
  .faq-question {
    background-color: #f0f0f0;
    padding: 0.5em;
    cursor: pointer;
  }
  
  .faq-answer {
    padding: 0.5em;
    background-color: #f9f9f9;
  }
  </style>
  