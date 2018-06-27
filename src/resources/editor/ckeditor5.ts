import { PLATFORM } from 'aurelia-pal';
import {ObserverLocator} from "aurelia-binding";
import { bindable, bindingMode, inject, customAttribute } from 'aurelia-framework';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@inject(Element,ObserverLocator)
@customAttribute('ckeditor5')

export class CkEditor5Attribute {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;

    
  constructor(private element) {
    this.element = element;
  }


  attached() {}
  detached() { }

  bind(){
    ClassicEditor
    .create( this.element, {
      toolbar: [ 'headings', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' , 'imageTextAlternative', '|', 'imageStyleFull', 'imageStyleSide', 'insertImage'],
    } )
    .then( editor => {
      editor.model.document.on('change', () => {
        this.element.value = editor.getData()
        this.element.dispatchEvent(new Event('change'));
      });
    } )
    .catch( error => {
    });
  }
    // attached() {
    //   // https://docs.ckeditor.com/ckeditor5/latest/features/image-upload.html

    //   ClassicEditor
    //   .create( this.element, {
    //     toolbar: [ 'headings', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' , 'imageTextAlternative', '|', 'imageStyleFull', 'imageStyleSide', 'insertImage'],
    //     heading: {
    //         options: [
    //             { modelElement: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
    //             { modelElement: 'heading1', viewElement: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
    //             { modelElement: 'heading2', viewElement: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    //         ]
    //     }
    //   } )
    //   .then( editor => {
    //     editor.document.on('changesDone', () => {
    //       this.element.value = editor.getData()
    //       this.element.dispatchEvent(new Event('change'));
    //     });
    //     console.log( editor );
    //   } )
    //   .catch( error => {
    //       console.error( error );
    //   } );

    //   // var $s = require('scriptjs');
    //   //   $s('../../../assets/plugins/ckeditor/ckeditor.js', () => {
    //   //       PLATFORM.global.CKEDITOR.replace(this.element).on('change', (e) => {
    //   //           this.element.value = e.editor.getData()
    //   //           this.element.dispatchEvent(new Event('change'));
    //   //       });
    //   //   });

    // }
    // detached() { }

}
