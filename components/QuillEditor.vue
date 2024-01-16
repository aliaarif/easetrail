<script setup>
//   import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    modelValue: String
  });
  
  const emit = defineEmits();
  
  let editor;
  const editorContainer = ref(null);
  
  onMounted(() => {
    // Ensure Quill is available
    if (typeof Quill === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.quilljs.com/1.3.6/quill.js';
      script.onload = initQuill;
      document.head.appendChild(script);
    } else {
      initQuill();
    }
  });
  
  function initQuill() {
    editor = new Quill(editorContainer.value, {
      theme: 'snow'
    });
  
    // If modelValue has content, set it
    if (props.modelValue) {
      editor.root.innerHTML = props.modelValue;
    }
  
    // Listen for changes and emit updates
    editor.on('text-change', () => {
      emit('update:modelValue', editor.root.innerHTML);
    });
  }
  
  // Watch for external modelValue changes (e.g. v-model usage)
  watch(
    () => props.modelValue,
    (newValue) => {
      if (editor && editor.root.innerHTML !== newValue) {
        editor.root.innerHTML = newValue;
      }
    }
  );
  </script>
  
  <style>
  #editor {
    height: 400px;
  }
  .column p:first-child{
    font-weight: normal;
  }
  </style>
<template>
    <div>
      <div ref="editorContainer"></div>
    </div>
</template>
  

  